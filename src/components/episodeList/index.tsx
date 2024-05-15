import { EpisodeType } from "@/services/courseService";
import styles from "./styles.module.scss";

interface props {
  episode: EpisodeType;
}

const EpisodeList = function ({ episode }: props) {
    const handleSecondsToMin = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60)

        const seconds = totalSeconds % 60

        function toString (num: number) {
            return num.toString().padStart(2, "0")
        }

        const result = `${toString(minutes)}:${toString(seconds)}`
        return result
    }

  return (
    <>
      <div className={styles.episodeCard}>
        <div className={styles.episodeOrderTime}>
          <p className={styles.episodeOrder}>Episódio Nº {episode.order}</p>
          <p className={styles.episodeTime}>{handleSecondsToMin(episode.secondsLong)}</p>
        </div>
        <div className={styles.episodeTitleDescription}>
          <p className={styles.episodeTitle}>{episode.name}</p>
          <p className={styles.episodeDescription}>
          {episode.synopsis}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam harum
            hic corporis cupiditate deleniti officiis, dolorem, quibusdam dolore
            aspernatur tempora a consequatur porro doloremque? Beatae libero,
            molestiae id impedit repellat nisi delectus incidunt neque optio,
            consequuntur quaerat laborum consectetur amet quam vel tenetur nam
            fugiat vitae commodi, sapiente ipsum. Ipsam?
            <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, repudiandae!
          </p>
        </div>
      </div>
    </>
  );
};

export default EpisodeList;
