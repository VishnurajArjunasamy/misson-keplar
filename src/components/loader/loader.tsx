import styles from './loader.module.scss'
export const Loader = () => {
  return <div className={styles['spinner']} data-testid='loader'></div>;
};
