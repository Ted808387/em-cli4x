<template>
  <div>
    <Alert></Alert>
    <frontNavbar></frontNavbar>
    <router-view></router-view>
    <frontFooter></frontFooter>
  </div>
</template>


<script>
import frontNavbar from '../../components/FrontNavbar.vue';
import frontFooter from '../../components/FrontFooter.vue';
import Alert from '../../components/AlertMessage.vue';

export default {
  components: {
    frontNavbar,
    frontFooter,
    Alert,
  },
};
</script>
