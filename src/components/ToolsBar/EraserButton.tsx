import IconButton from "../IconButton";

type Props = {
    isActive: boolean;
    onClick: () => void;
};

export default function EraserButton({ isActive, onClick }: Props) {
    return (
        <IconButton isActive={isActive} onClick={onClick}>
            <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
                <path
                    d="M28,32H15.33L19,28.37l-9.9-9.9L3.54,24a1.83,1.83,0,0,0,0,2.6L9,32H3a1,1,0,0,0,0,2H28a1,1,0,0,0,0-2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M34.08,10.65l-7.3-7.3a1.83,1.83,0,0,0-2.6,0L10.47,17.06l9.9,9.9L34.08,13.25A1.85,1.85,0,0,0,34.08,10.65Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </IconButton>
    );
}
