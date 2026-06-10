import styles from "./AboutMe.module.css";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/i18n-config";

export default async function AboutMe({ lang }: { lang: Locale }) {
  const t = await getDictionary(lang);

  const HtmlText = ({ html }: { html: string }) => (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  );

  return (
    <div className={styles.wrapper}>
      <section className={styles.content} id="intro">
        <section className={styles.card}>
          <h2 className={styles.heading}>{t["aboutMe"].betterHorizon}</h2>
          <HtmlText html={t["aboutMe"].betterHorizonText} />
        </section>
        <section className={styles.card}>
          <h2 className={styles.heading}>{t["aboutMe"].whyJapan}</h2>
          <HtmlText html={t["aboutMe"].whyJapanText} />
        </section>
      </section>
      <section className={styles.content}>
        <section className={styles.card}>
          <h2 className={styles.heading}>
            {t["aboutMe"].professionalAchievements}
          </h2>
          <p>{t["aboutMe"].professionalAchievementsText}</p>
          <ul>
            {t["aboutMe"].achievements.map((a, index) => (
              <li key={index}>{a}</li>
            ))}
          </ul>

          <HtmlText html={t["aboutMe"].achievementsConclusion} />
        </section>
        <section className={styles.card}>
          <h2 className={styles.heading}>
            {t["aboutMe"].softSkillsAndJapanese}
          </h2>
          <HtmlText html={t["aboutMe"].softSkillsText} />
          <HtmlText html={t["aboutMe"].JapaneseLevelText} />
        </section>
      </section>
    </div>
  );
}
