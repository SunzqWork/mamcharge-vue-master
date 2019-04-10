<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { Message, Loading } from "element-ui";
// loading
window.setIn
  ? ""
  : (window.setIn = setInterval(s => {
      if (ary.length == 0) {
        try {
          window.loadingInstance.close();
          window.loadingInstance = "close";
        } catch (error) {}
      } else {
        try {
          if (window.loadingInstance == "close") {
            window.loadingInstance = Loading.service({ fullscreen: true });
          }
        } catch (error) {
          window.loadingInstance = Loading.service({ fullscreen: true });
        }
      }
    }, 800));

export default {
  name: "App"
};
</script>
