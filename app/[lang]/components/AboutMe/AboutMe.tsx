import styles from "./AboutMe.module.css";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/i18n-config";

export default async function AboutMe({ lang }: { lang: Locale }) {
  const t = await getDictionary(lang);
  return (
    <div className={styles.wrapper}>
      <section className={styles.content} id="aboutMe">
        <section className={styles.card}>
          <h2 className={styles.heading}>{t["aboutMe"].betterHorizon}</h2>
          <p>{t["aboutMe"].betterHorizonText}</p>
        </section>
        <section className={styles.card}>
          <h2 className={styles.heading}>{t["aboutMe"].whyJapan}</h2>
          <p>{t["aboutMe"].whyJapanText}</p>
        </section>
        <section className={styles.card}>
          <h2 className={styles.heading}>
            {t["aboutMe"].professionalAchievements}
          </h2>
          <p>{t["aboutMe"].professionalAchievementsText}</p>
          <ul>
            {t["aboutMe"].achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <p>{t["aboutMe"].achievementsConclusion}</p>
        </section>
        <section className={styles.card}>
          <h2 className={styles.heading}>
            {t["aboutMe"].softSkillsAndJapanese}
          </h2>
          <p>{t["aboutMe"].softSkillsText}</p>
          <p>{t["aboutMe"].JapaneseLevelText}</p>
        </section>
      </section>
    </div>
  );
}
