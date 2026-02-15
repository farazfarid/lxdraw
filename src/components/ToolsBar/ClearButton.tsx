import IconButton from "../IconButton";

type Props = {
    onClick: () => void;
};

export default function ClearButton({ onClick }: Props) {
    return (
        <IconButton onClick={onClick}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path
                    d="M12 12L24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M24 12L12 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </IconButton>
    );
}
