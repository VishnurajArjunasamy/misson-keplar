import React from 'react'
import styles from './quotes.module.scss'
import { HOME } from '../../constants/app.constant';

const { QUOTE_1, QUOTE_2 } = HOME;

export default function Quotes() {
  return (
    <div className={styles["quotes"]}>
    <h1>{QUOTE_1}</h1>
    <h2>{QUOTE_2}</h2>
  </div>
  )
}
