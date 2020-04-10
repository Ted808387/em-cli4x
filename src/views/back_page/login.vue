<template>
  <div>
    <div class="login-bg"></div>
    <form class="form-signin" @submit.prevent="signin">
      <div class="form-login">
        <div class="text-center mb-4">
          <h1 class="h3 mb-3 font-weight-normal font-weight-bold">Login</h1>
          <a href="https://caniuse.com/#feat=css-placeholder-shown"></a>
        </div>

        <div class="form-label-group">
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus v-model="user.username"/>
          <label for="inputEmail">Email address</label>
        </div>
        <div class="form-label-group">
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="user.password"/>
          <label for="inputPassword">Password</label>
        </div>
        <div class="checkbox mb-3"></div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p class="text-center mt-5 mb-0 text-muted">僅做為個人學習使用，非商業用途。</p>
        <p class="mb-3 text-muted text-center">&copy; 2017-2020</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/admin/signin`;
      vm.$http.post(api, vm.user).then(response => {
        if (response.data.success) {
          vm.$router.push("/Dashboard/Products");
        }
      });
    }
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
}
body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}
.login-bg {
  background-image: url("https://images.unsplash.com/photo-1584334639045-e1bbea88b960?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=300");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 1200px;
  position: fixed;
  top: 0;
  z-index: -100;
}
.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
  height: 800px;
  display: flex;
  align-items: center;
}
.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}
.form-label-group > input,
.form-label-group > label {
  height: 3.125rem;
  padding: 0.75rem;
}
.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  pointer-events: none;
  cursor: text; /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}
.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}
.form-label-group input:-ms-input-placeholder {
  color: transparent;
}
.form-label-group input::-ms-input-placeholder {
  color: transparent;
}
.form-label-group input::-moz-placeholder {
  color: transparent;
}
.form-label-group input::placeholder {
  color: transparent;
}
.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}
.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}
/* Fallback for Edge
-------------------------------------------------- */
@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}
/* Fallback for IE
-------------------------------------------------- */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
.form-login {
  width: 100%;
}
</style>