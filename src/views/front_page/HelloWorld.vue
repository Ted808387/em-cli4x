<template>
  <div>
    <Alert></Alert>
    <frontNavbar></frontNavbar>
    <router-view></router-view>
    <frontFooter></frontFooter>
  </div>
</template>


<script>
import frontNavbar from "../../components/FrontNavbar";
import frontFooter from "../../components/FrontFooter";
import Alert from "../../components/AlertMessage";

export default {
  components: {
    frontNavbar,
    frontFooter,
    Alert
  }
};
</script>
