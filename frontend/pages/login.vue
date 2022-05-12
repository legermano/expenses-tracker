<template>
  <v-container class="fill-height">
    <v-row class="d-flex flex-column justify-center align-center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-6">
                    <h1 class="text-center display-2 pb-1">
                      Sign in to Expenses Tracker
                    </h1>
                    <v-form>
                      <v-text-field
                        id="email"
                        v-model="loginForm.email"
                        label="Email"
                        name="email"
                        prepend-icon="mdi-email"
                        type="text"
                      />

                      <v-text-field
                        id="password"
                        v-model="loginForm.password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        :type="showLoginPassword ? 'text' : 'password'"
                        :append-icon="showLoginPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showLoginPassword = !showLoginPassword"
                      />
                    </v-form>
                    <h3 class="text-right mt-n4">
                      Forgot your password ?
                    </h3>
                    <v-alert
                      class="mt-2 mb-n1"
                      type="error"
                      :value="loginForm.showError">
                      {{ loginForm.errorMessage }}
                    </v-alert>
                  </v-card-text>
                  <div class="text-center mb-3">
                    <v-btn rounded outlined dark @click="login">
                      Sign In
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="teal accent-4  d-flex flex-column justify-center">
                  <v-card-text class="white--text">
                    <h1 class="text-center display-2">
                      Hello, Friend!
                    </h1>
                    <h5 class="text-center">
                      Enter your personal details and start journay with us
                    </h5>
                  </v-card-text>
                  <div class="text-center mb-3">
                    <v-btn rounded outlined dark @click="step++">
                      Sign up
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="4" class="teal accent-4 d-flex flex-column justify-center align-center">
                  <v-card-text class="white--text">
                    <h1 class="text-center display-2">
                      Welcome Back!
                    </h1>
                    <h5 class="text-center">
                      To Keep conneted with us please login whit your personnel info
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step--">
                      Sign in
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="12" md="8">
                  <v-card-text class="mt-6">
                    <h1 class="text-center display-2">
                      Create Account
                    </h1>
                    <v-form>
                      <v-text-field
                        id="username"
                        v-model="registerForm.username"
                        label="Username"
                        name="username"
                        prepend-icon="mdi-account"
                        type="text"
                      />
                      <v-text-field
                        id="email"
                        v-model="registerForm.email"
                        label="Email"
                        name="email"
                        prepend-icon="mdi-email"
                        type="email"
                      />
                      <v-text-field
                        id="password"
                        v-model="registerForm.password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        :type="showRegisterPassword ? 'text' : 'password'"
                        :append-icon="showRegisterPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showRegisterPassword = !showRegisterPassword"
                      />
                    </v-form>
                    <v-alert
                      type="error"
                      :value="registerForm.showError">
                      {{ registerForm.errorMessage }}
                    </v-alert>
                  </v-card-text>
                  <div class="text-center mt-n5 mb-3">
                    <v-btn rounded outlined dark @click="register">
                      Sign up
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'login',
  data() {
    return {
      step: 1,
      showLoginPassword: false,
      showRegisterPassword: false,
      loginForm: {
        email: '',
        password: '',
        errorMessage: '',
        showError: false
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        errorMessage: '',
        showError: false,
      }
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: this.loginForm
        });
      } catch (error) {
        this.loginForm.showError = true;
        this.loginForm.errorMessage = error.response.data.message;
      }
    },

    async register() {
      try {
        await this.$axios.$post('/auth/register', this.registerForm);
        await this.$auth.loginWith('local', {
          data: this.registerForm
        });
      } catch (error) {
        this.registerForm.showError = true;
        this.registerForm.errorMessage = error.response.data.message;
      }
    }
  }
}
</script>
