import React, { useEffect, useRef } from 'react';

const MarkerSounds = {
  1: "https://drupal9.wintersandassociates.com/sites/default/files/2021-12/Musqueam%20street%20signs%20-%20Student%20Union%20Boulevard%20-%20sq%CC%93%CA%B7%C9%99lexe%CC%81l%C9%99.mp3",
  2: "https://drupal9.wintersandassociates.com/sites/default/files/2021-12/Musqueam%20street%20signs%20-%20University%20Boulevard%20-%20s%CC%8Cx%CA%B7y%C9%99%CE%B8%C9%99st%C9%99m_4.mp3",
  3: "https://drupal9.wintersandassociates.com/sites/default/files/2021-12/Musqueam%20street%20signs%20-%20West%20Mall%20-%20sme_nta%CC%81s%C9%99m_5.mp3",
  4: "https://drupal9.wintersandassociates.com/sites/default/files/2021-12/Musqueam%20street%20signs%20-%20Agricultural%20Road%20-%20q%CC%93%CA%B7e%CF%87t_0.mp3",
  5: "https://drupal9.wintersandassociates.com/sites/default/files/2021-12/Musqueam%20street%20signs%20-%20Crescent%20Road%20-%20x%CA%B7sel%CC%95c%CC%93%C9%99%CF%87%C9%99n%CC%93.mp3",
  6: "https://drupal9.wintersandassociates.com/sites/default/files/2021-12/Musqueam%20street%20signs%20-%20East%20Mall%20-%20c%C9%99l%CC%95q%CA%B7as.mp3",
  7: "https://drupal9.wintersandassociates.com/sites/default/files/2021-12/Musqueam%20street%20signs%20-%20Lower%20Mall%20-%20st%C9%99yw%C9%99t_4.mp3",
  8: "https://drupal9.wintersandassociates.com/sites/default/files/2021-12/Musqueam%20street%20signs%20-%20Main%20Mall%20-%20s%CC%8Cx%CA%B7%CA%94ey%CC%93e%CA%94_2.mp3",
  9: "https://drupal9.wintersandassociates.com/sites/default/files/2021-12/Musqueam%20street%20signs%20-%20Memorial%20Road%20-%20s%CC%8Cx%CA%B7h%C9%99k%CC%93%CA%B7m%C9%99t_0.mp3",
}

export default () => {
  const sceneRef = useRef(null);

  useEffect(() => {

  }, []);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const arSystem = sceneEl.systems["mindar-image-system"];
    sceneEl.addEventListener('renderstart', () => {
      arSystem.start(); // start AR 
    });
    Object.keys(MarkerSounds).forEach((e) => {
      let currentMarker = document.querySelector("#marker" + e)
      currentMarker.addEventListener('targetFound', (event) => {
        currentMarker.querySelector("a-plane").addEventListener('click', (e) => {
          let soundEntity = document.createElement('a-sound')
          soundEntity.setAttribute("src", 'url(' + MarkerSounds[e] + ')')
          soundEntity.setAttribute("autoplay", false)
          soundEntity.setAttribute("loop", false)
          soundEntity.setAttribute("volume", 5);
          soundEntity.setAttribute("positional", true);
          soundEntity.addEventListener('sound-loaded', (e) => {

            soundEntity.components.sound.playSound();
            console.log('got sound loaded event')
          })
          soundEntity.addEventListener('sound-ended', (e) => {
            console.log('got sound ended event')
            soundEntity.components.sound.stopSound();
          })
          document.querySelector("a-scene").appendChild(soundEntity)
          console.log('click event')
        })

        console.log('found marker')
      })

      currentMarker.addEventListener('targetLost', (event) => {
        let sound = document.querySelector("a-sound")
        if (sound != undefined) {
          document.querySelector("a-scene").removeChild(sound)
        }
        console.log('lost marker')
      })
    })

    //TODO: hard code audio file urls per marker {1: <url>, 2: <url>, etc...} DONE 
    // add marker found event to each marker that attaches sound entity with url for that marker index
    // add marker lost event that removes sound element


    return () => {
      arSystem.stop();
    }
  }, [])

  return (
    <a-scene ref={sceneRef} mindar-image="imageTargetSrc: ./targets.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;" color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
      <a-assets>
        <img id="card" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/card.png" />
        <a-asset-item id="avatarModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false" cursor="rayOrigin: mouse" rayCaster="objects: .clickable"></a-camera>


      <a-entity id="marker1" mindar-image-target={"targetIndex: 0"}>
        <a-plane class="clickable" color="#87CEEB" rotation="0 0 0"></a-plane>
        <a-box class="playSoundButton clickable" rotation="0 0 0" position="-0.2 -0.2 0" scale="0.5 0.1 0.05"></a-box>
        <a-box class="cancelButton" rotation="0 0 0" position="0.2 -0.2 0" scale="0.5 0.1 0.05"></a-box>
      </a-entity>

      <a-entity id="marker2" mindar-image-target={"targetIndex: 1"}>
        <a-plane color="red" rotation="0 0 0"></a-plane>
        <a-box class="playSoundButton clickable" rotation="0 0 0" position="-0.2 -0.2 0.2" scale="0.2 0.1 0.05"></a-box>
        <a-box class="cancelButton" rotation="0 0 0" position="0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
      </a-entity>

      <a-entity id="marker3" mindar-image-target={"targetIndex: 2"}>
        <a-plane color="red" rotation="0 0 0"></a-plane>
        <a-box class="playSoundButton clickable" rotation="0 0 0" position="-0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
        <a-box class="cancelButton" rotation="0 0 0" position="0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
      </a-entity>

      <a-entity id="marker4" mindar-image-target={"targetIndex: 3"}>
        <a-plane color="red" rotation="0 0 0"></a-plane>
        <a-box class="playSoundButton clickable" rotation="0 0 0" position="-0.2 -0.2 1" scale="0.2 0.1 0.05"></a-box>
        <a-box rotation="0 0 0" position="0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
      </a-entity>

      <a-entity id="marker5" mindar-image-target={"targetIndex: 4"}>
        <a-plane color="red" rotation="0 0 0"></a-plane>
        <a-box rotation="0 0 0" position="-0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
        <a-box rotation="0 0 0" position="0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
      </a-entity>

      <a-entity id="marker6" mindar-image-target={"targetIndex: 5"}>
        <a-plane color="red" rotation="0 0 0"></a-plane>
        <a-box rotation="0 0 0" position="-0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
        <a-box rotation="0 0 0" position="0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
      </a-entity>

      <a-entity id="marker7" mindar-image-target={"targetIndex: 6"}>
        <a-plane color="red" rotation="0 0 0"></a-plane>
        <a-box rotation="0 0 0" position="-0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
        <a-box rotation="0 0 0" position="0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
      </a-entity>

      <a-entity id="marker8" mindar-image-target={"targetIndex: 7"}>
        <a-plane color="red"></a-plane>
        <a-box rotation="0 0 0" position="-0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
        <a-box rotation="0 0 0" position="0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
      </a-entity>

      <a-entity id="marker9" mindar-image-target={"targetIndex: 7"}>
        <a-plane color="red"></a-plane>
        <a-box rotation="0 0 0" position="-0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
        <a-box rotation="0 0 0" position="0.2 -0.2 0" scale="0.2 0.1 0.05"></a-box>
      </a-entity>
    </a-scene>
  )
}
