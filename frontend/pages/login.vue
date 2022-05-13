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
                    <v-form ref="loginForm">
                      <v-text-field
                        id="email"
                        v-model="loginForm.email"
                        label="Email"
                        name="email"
                        prepend-icon="mdi-email"
                        type="text"
                        :rules="validations.email"
                      />

                      <v-text-field
                        id="password"
                        v-model="loginForm.password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        :type="loginForm.showPassord ? 'text' : 'password'"
                        :rules="validations.loginPassword"
                        :append-icon="
                          loginForm.showPassord ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        @click:append="loginForm.showPassord = !loginForm.showPassord"
                      />
                    </v-form>
                    <h3 class="text-right">Forgot your password ?</h3>
                    <v-alert
                      class="mt-2 mb-n1"
                      type="error"
                      :value="loginForm.showError"
                    >
                      {{ loginForm.errorMessage }}
                    </v-alert>
                  </v-card-text>
                  <div class="text-center mb-3">
                    <v-btn rounded outlined dark @click="login">
                      Sign In
                    </v-btn>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  class="teal accent-4 d-flex flex-column justify-center"
                >
                  <v-card-text class="white--text">
                    <h1 class="text-center display-2">Hello, Friend!</h1>
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
                <v-col
                  cols="12"
                  md="4"
                  class="teal accent-4 d-flex flex-column justify-center align-center"
                >
                  <v-card-text class="white--text">
                    <h1 class="text-center display-2">Welcome Back!</h1>
                    <h5 class="text-center">
                      To Keep conneted with us please login whit your personnel
                      info
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
                    <h1 class="text-center display-2">Create Account</h1>
                    <v-form ref="registerForm">
                      <v-text-field
                        id="username"
                        v-model="registerForm.username"
                        label="Username"
                        name="username"
                        prepend-icon="mdi-account"
                        type="text"
                        :rules="validations.username"
                      />
                      <v-text-field
                        id="email"
                        v-model="registerForm.email"
                        label="Email"
                        name="email"
                        prepend-icon="mdi-email"
                        type="email"
                        :rules="validations.email"
                      />
                      <v-text-field
                        id="password"
                        v-model="registerForm.password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        :rules="validations.registerPassword"
                        :type="loginForm.showPassord ? 'text' : 'password'"
                        :append-icon="
                          loginForm.showPassord ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        @click:append="
                          loginForm.showPassord = !loginForm.showPassord
                        "
                      />
                    </v-form>
                    <v-alert type="error" :value="registerForm.showError">
                      {{ registerForm.errorMessage }}
                    </v-alert>
                  </v-card-text>
                  <div class="text-center mt-n3 mb-3">
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
      loginForm: {
        email: null,
        password: null,
        errorMessage: null,
        showError: false,
        showPassord: false,
      },
      registerForm: {
        username: null,
        email: null,
        password: null,
        errorMessage: null,
        showError: false,
        showPassord: false,
      },
      validations: {
        email: [
          v => !!v || 'Email is requerid',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        loginPassword: [
          v => !!v || 'Password is required',
        ],
        registerPassword: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be more than 6 characters',
          v => /[A-Z]/.test(v) || 'Password must contain at least 1 uppercase character',
          v => /[a-z]/.test(v) || 'Password must contain at least 1 lowercase character',
          v => /[0-9]/.test(v) || 'Password must contain at least 1 numeric character',
          v => /[#?!@$%^&*-]/.test(v) || 'Password must contain at least 1 special character',
        ],
        username: [
          v => !!v || 'Username is requerid',
          v => (v && v.length >= 5 ) || 'Username must be more than 5 characters'
        ]
      }
    }
  },
  methods: {
    async login() {
      if(this.$refs.loginForm.validate()) {
        try {
          await this.$auth.loginWith('local', {
            data: this.loginForm,
          })
        } catch (error) {
          this.loginForm.showError = true
          this.loginForm.errorMessage = error.response.data.message
        }
      }
    },

    async register() {
      if(this.$refs.registerForm.validate()) {
        try {
          await this.$axios.$post('/auth/register', this.registerForm)
          await this.$auth.loginWith('local', {
            data: this.registerForm,
          })
        } catch (error) {
          this.registerForm.showError = true
          this.registerForm.errorMessage = error.response.data.message
        }
      }
    },
  },
}
</script>
