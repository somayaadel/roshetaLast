<template>
  <section class="login">
    <div class="container">
      <div class="row ">
        <div class="col-md-6">
          <div class="login-logo">
            
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="login">
            <div class="text-center">
              <input
                type="email"
                class=" form-control  login-form"
                id="exampleInputEmail1"
                placeholder="Email"
                v-model="email"
                :class="{ 'is-invalid': $v.email.$error }"
              />
            </div>
            <div class="row">
              <div class="col-md-12 login-error-div">
                <p
                  v-if="!$v.email.required && $v.email.$error"
                  class="error-validate login-error"
                >
                  Email is required.
                </p>
                <p
                  v-if="!$v.email.email && $v.email.$error"
                  class="error-validate login-error"
                >
                  Enter your valid email.
                </p>
              </div>
            </div>
            <div
              class="text-center"
             
            >
              <input
                type="password"
                class=" form-control  login-form login-password"
                id="exampleInputPassword1"
                placeholder="Password"
                v-model="password"
                
              />
            </div>
            <div class="row">
              <div class="col-md-12 login-password-error">
                <p
                  v-if="!$v.password.required && $v.password.$error"
                  class="error-validate login-error "
                >
                  Password is required.
                </p>
               

                <p v-if="invalidEmail" class="error-validate login-error">
                  Invalid Email Or Password
                </p>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-cust login-button ">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <footer class="login-footer">version 0.0</footer>
  </section>
</template>
<script>
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      invalidEmail: false
    };
  },
  beforeCreate() {
    document.body.className = "login-layout";
  },
  validations: {
    password: {
      required,
      
    },
    email: { required, email }
  },
  methods: {
    login: function() {
      this.$v.$touch();
      if (!this.$v.$error) {
        let email = this.email;
        let password = this.password;
        this.$store
          .dispatch("login", { email, password })
          .then(() => {
            this.$router.push("/");
            
          })
          .catch(err => {
            if (err == 401) {
              this.invalidEmail = true;
            }
          });
      }
    }
  }
};
</script>
