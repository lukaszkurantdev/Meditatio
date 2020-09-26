import Sound from 'react-native-sound';

export default class SoundService {
  private constructor(
    private musicSource: string,
    private stopSignalSource: string,
  ) {
    Sound.setCategory('Playback');
  }

  private meditationMusic: Sound;
  private stopSignal: Sound;

  playMusic = () => {
    this.meditationMusic = new Sound(
      this.musicSource,
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          return;
        }
        this.meditationMusic.play();
        this.meditationMusic.setNumberOfLoops(-1);
      },
    );
  };

  public stopMusic = () => {
    this.meditationMusic.stop();
  };

  public playStopSignal = () => {
    this.stopSignal = new Sound(
      this.stopSignalSource,
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          return;
        }
        this.stopSignal.play();
      },
    );
  };
}
