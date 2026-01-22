import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getDeliveryStatus, type DeliveryStatusResponse } from '../../../lib/apiClient';

type UiState = {
  status: DeliveryStatusResponse['status'];
  repoUrl?: string;
  reasonCode?: string;
  message?: string;
  updatedAt?: string;
};

function formatStatusLabel(status: UiState['status']): string {
  switch (status) {
    case 'PENDING':
      return 'Delivering…';
    case 'DELIVERED':
      return 'Delivered';
    case 'FAILED':
      return 'Delivery failed';
    case 'UNKNOWN':
    default:
      return 'Checking…';
  }
}

function formatStatusHint(state: UiState): string {
  if (state.status === 'DELIVERED') {
    if (state.reasonCode === 'DRY_RUN_INVITES_DISABLED') return 'Dry-run mode: no invitation was sent.';
    if (state.reasonCode === 'OWNER_ALREADY_HAS_ACCESS') return 'Owner account already has access.';
    return 'Invitation sent. Accept it on GitHub to access the private repository.';
  }

  if (state.status === 'FAILED') {
    return state.message ?? 'We could not deliver your GitHub invitation.';
  }

  if (state.status === 'PENDING') {
    return 'We are delivering your GitHub invitation. This usually takes under a minute.';
  }

  return state.message ?? 'We are verifying delivery status.';
}

function buildSupportMailto(params: {
  sku?: string | null;
  sessionId?: string | null;
  githubUsername?: string | null;
}): string {
  const { sku, sessionId, githubUsername } = params;

  const subjectParts: string[] = ['Zippers delivery support'];
  if (sku) subjectParts.push(`sku=${sku}`);
  if (sessionId) subjectParts.push(`session=${sessionId}`);

  const subject = encodeURIComponent(subjectParts.join(' · '));

  const bodyLines: string[] = [
    'Hello Zippers Support,',
    '',
    'I completed a purchase and need help confirming delivery.',
    '',
    sku ? `Product: ${sku}` : '',
    sessionId ? `Session: ${sessionId}` : '',
    githubUsername ? `GitHub: @${githubUsername}` : '',
    '',
    'Thanks!',
  ].filter(Boolean);

  const body = encodeURIComponent(bodyLines.join('\n'));
  return `mailto:support@zippers.dev?subject=${subject}&body=${body}`;
}

export function BuySuccessPage() {
  const { sku } = useParams<{ sku: string }>();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const githubUsername = useMemo(() => {
    if (!sku) return null;
    return sessionStorage.getItem(`buy:lastGithubUsername:${sku}`);
  }, [sku]);

  const [ui, setUi] = useState<UiState>(() => ({
    status: sessionId ? 'PENDING' : 'UNKNOWN',
    message: sessionId ? 'Verifying delivery…' : 'Missing session reference.',
  }));

  const stopPollingRef = useRef(false);
  const pollAttemptRef = useRef(0);
  const timeoutIdRef = useRef<number | null>(null);

  const supportMailto = useMemo(
    () => buildSupportMailto({ sku, sessionId, githubUsername }),
    [sku, sessionId, githubUsername]
  );

  useEffect(() => {
    if (!sessionId) return;

    stopPollingRef.current = false;
    pollAttemptRef.current = 0;

    const pollOnce = async () => {
      try {
        const status = await getDeliveryStatus(sessionId);

        setUi({
          status: status.status,
          repoUrl: status.repoUrl,
          reasonCode: status.reasonCode,
          message: status.message,
          updatedAt: status.updatedAt,
        });

        if (status.status === 'DELIVERED' || status.status === 'FAILED') {
          stopPollingRef.current = true;
        }
      } catch {
        setUi((prev) => ({
          ...prev,
          status: 'UNKNOWN',
          message: 'Network error while checking delivery status.',
        }));
      }
    };

    const scheduleNext = () => {
      if (stopPollingRef.current) return;

      pollAttemptRef.current += 1;
      const attempt = pollAttemptRef.current;

      // 1-10 attempts -> every 2s (~20s)
      // 11-22 attempts -> every 5s (~60s)
      const delayMs = attempt <= 10 ? 2000 : 5000;

      if (attempt > 22) {
        stopPollingRef.current = true;

        setUi((prev) => ({
          ...prev,
          status: prev.status === 'PENDING' ? 'UNKNOWN' : prev.status,
          message:
            prev.status === 'PENDING'
              ? 'Delivery is taking longer than expected. Please check GitHub and contact support if needed.'
              : prev.message,
        }));

        return;
      }

      timeoutIdRef.current = window.setTimeout(async () => {
        await pollOnce();
        scheduleNext();
      }, delayMs);
    };

    // Kick off immediately
    pollOnce().then(scheduleNext);

    return () => {
      stopPollingRef.current = true;
      if (timeoutIdRef.current !== null) {
        window.clearTimeout(timeoutIdRef.current);
      }
    };
  }, [sessionId]);

  const statusLabel = formatStatusLabel(ui.status);
  const statusHint = formatStatusHint(ui);

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-white">Payment successful</h1>
      <p className="mt-2 text-slate-200/90">
        <span className="font-medium text-slate-100">Next step:</span> accept your GitHub invite
      </p>

      <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200/80">
              Delivery status
            </h2>
            <p className="mt-2 text-lg font-semibold text-white">{statusLabel}</p>
            <p className="mt-1 text-sm text-slate-200/80">{statusHint}</p>

            {ui.updatedAt ? (
              <p className="mt-2 text-xs text-slate-200/60">Updated: {ui.updatedAt}</p>
            ) : null}
          </div>

          <div className="flex flex-col items-end gap-2">
            <a
              href="https://github.com/settings/repositories"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
            >
              Open GitHub invitations
            </a>

            {ui.status === 'DELIVERED' && ui.repoUrl ? (
              <a
                href={ui.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
              >
                Open repository
              </a>
            ) : null}

            <a
              href={supportMailto}
              className="text-sm text-slate-200/80 underline underline-offset-4 hover:text-slate-100"
            >
              Contact support
            </a>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-slate-200/90">
          {githubUsername ? (
            <>
              We sent the repository invitation to{' '}
              <span className="font-mono text-slate-100">@{githubUsername}</span>.
            </>
          ) : (
            <>We sent the repository invitation to the GitHub username you entered.</>
          )}
        </p>

        <div className="mt-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200/80">
            Checklist
          </h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-slate-200/90">
            <li>Check GitHub notifications</li>
            <li>Check the email linked to your GitHub account</li>
            <li>
              If you don’t see it after <span className="font-medium text-slate-100">5 minutes</span>
              :{' '}
              <a className="underline underline-offset-4 hover:text-slate-100" href={supportMailto}>
                support@zippers.dev
              </a>
            </li>
          </ol>
        </div>

        {sessionId || sku ? (
          <p className="mt-4 text-sm text-slate-200/70">
            {sessionId ? <>Reference: {sessionId}</> : null}
            {sessionId && sku ? ' · ' : null}
            {sku ? <>Product: {sku}</> : null}
          </p>
        ) : null}
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/products/safestate-recovery"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
        >
          Back to product page
        </Link>

        <Link
          to="/savior"
          className="text-sm text-slate-200/80 underline underline-offset-4 hover:text-slate-100"
        >
          Back to Savior
        </Link>
      </div>
    </main>
  );
}
