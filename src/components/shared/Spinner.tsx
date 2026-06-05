import styles from '../../style/Spinner.module.css';

interface SpinnerProps {
    size?: string;
}

/** Un componente de spinner animado y reutilizable. */
export const Spinner = ({ size = '48px' }: SpinnerProps) => {
    return (
        <div
            className={styles.loader}
            style={{ width: size, height: size }}
        />
    );
};