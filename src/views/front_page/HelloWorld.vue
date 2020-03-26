<template>
    <div>
        <Alert></Alert>
        <frontNavbar></frontNavbar>
        <router-view></router-view>
        <frontFooter></frontFooter>
    </div>
</template>


<script>
import frontNavbar from '../../components/frontNavbar';
import frontFooter from '../../components/frontFooter';
import Alert from '../../components/AlertMessage';

export default {
    components: {
      frontNavbar,
      frontFooter,
      Alert,
    },
};
</script>
