type LandingFooterProps = {
  text: string;
};

export function LandingFooter({ text }: LandingFooterProps) {
  return (
    <footer>
      <div className="wrap">
        <div>{text}</div>
      </div>
    </footer>
  );
}
