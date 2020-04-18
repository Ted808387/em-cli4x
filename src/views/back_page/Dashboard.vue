<template>
  <div>
    <navbar></navbar>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <sidebar></sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from '../../components/Sidebar.vue';
import navbar from '../../components/Navbar.vue';
import Alert from '../../components/AlertMessage.vue';

export default {
  components: {
    sidebar,
    navbar,
    Alert,
  },
};
</script>
