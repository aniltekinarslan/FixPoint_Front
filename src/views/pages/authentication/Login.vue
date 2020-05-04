<template>
	<div class="login-page flex">
		<div class="box grow scrollable align-vertical side-box box-left">
			<div class="align-vertical-middle wrapper text-center">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo-left"/>
				<h1 class="h-big">FixPoint ERP</h1>
				<p class="p-50">İşletmeniz ile alakalı tüm işlemlerinizi bir arada yürütebileceğiniz yeni nesil web
					platformu...</p>
			</div>
		</div>
		<div class="box grow scrollable align-vertical side-box box-right">
			<div class="align-vertical-middle wrapper">

				<form class="form-box" @submit.prevent="handleLogin">
					<h2 class="mb-30">Hesabına giriş yap</h2>


                    <float-label class="styled">
                        Şirket:
                        <el-select v-model="form.companycode" placeholder="- Seçin -">
                            <el-option
                                    v-for="item in sirketler"
                                    :key="item.Sirket_Kod"
									:label="item.Sirket_Adi"
                                    :value="item.Sirket_Kod">
                            </el-option>
                        </el-select>
                    </float-label>
					<float-label class="styled">
						<input
								:disabled="isLoading"
								type="username"
								required
								minlength="1"
								maxlength="10"
								name="username"
								placeholder="Kullanıcı Adınız"
								v-model="form.username"
						/>
					</float-label>
					<float-label class="styled">
						<input
								:disabled="isLoading"
								type="password"
								required
								minlength="1"
								maxlength="15"
								name="password"
								placeholder="Şifreniz"
								v-model="form.password"
						/>
					</float-label>

					<div class="flex text-center center pt-15 pb-10">
						<el-button
								plain
								:loading="isLoading"
								size="small"
								native-type="submit"
								class="login-btn pulse animated themed"
						>{{ isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap' }}</el-button>
					</div>
				</form>
			</div>

		</div>

	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";
    import SirketService from "@/services/Tanimlamalar/Sirket";

	export default {
		name: "Login",
		data() {
			return {
			    sirketler: {},
				form: {
				    companycode: null,
					username: null,
					password: null
				}
			};
		},
		computed: {
			...mapState("auth", ["isLoading"])
		},
        mounted()
        {
            SirketService
               .GetByList()
               .then(response =>
               {
                   if (response && response.data)
                       this.sirketler = response.data.data.data;
               })
               .catch(error =>
               {
                   alert(error);
               });
        },
		created() {
			//this.logout(true);
		},
		methods: {
			...mapActions("auth", ["login", "logout"]),
			handleLogin() {
				this.login(this.form);
			}
		}
	};
</script>

<style lang="scss">
	@import "../../../assets/scss/_variables";

	.login-page {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0 !important;

		.side-box {
			.wrapper {
				width: 100%;
				box-sizing: border-box;
				padding: 20px;
			}
		}

		.box-left {
			background-image: url("../../../assets/images/login2.jpg");
			background-size: cover;
			background-position: 50% 50%;
			position: relative;
			display: flex;
			align-items: center;
			z-index: 9;
			color: #fff;
			&:before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: #000;
				opacity: 0.3;
				z-index: -1;
			}

			.wrapper {
				.image-logo {
					max-width: 600px;
					margin-top: 20px;
				}
			}
		}
		.box-right {
			background: white;
			color: var(--background-color);
		}

		.form-box {
			width: 100%;
			max-width: 400px;
			padding: 50px;
			box-sizing: border-box;
			margin: 20px auto;
			box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			border: 1px solid #eee;
			a {
				font-size: 14px;
				color: var(--color-accent);
				text-decoration: none;
				font-weight: 500;
			}

			.image-logo {
				width: 300px;
				margin: 0px auto;
				margin-bottom: 50px;
				display: block;
			}

			.vfl-has-label.styled .vfl-label + input {
				padding: 15px 10px;
				width: 100%;
				background-color: #eee;
				border: 1px solid #ddd;
				border-radius: 5px;
				display: block;
				box-sizing: border-box;
			}

			.login-btn {
				background-color: $text-color-danger;
				color: #fff;
				border-color: $text-color-danger;
				border-width: 2px;
				font-weight: bold;
				font-size: 16px;
				width: 100%;
				padding: 15px 30px;
				border-radius: 30px;

				&:hover {
					background: rgba(var(--color-accent-rgb), 1);
					border-color: var(--text-color);
					color: var(--text-color);
				}
			}
		}
	}

	@media (max-width: 1200px) {
		.login-page {
			.box-left {
				.wrapper {
					.h-big {
						font-size: 50px;
					}
				}
			}
		}
	}
	@media (max-width: 900px) {
		.login-page {
			.box-left {
				.wrapper {
					.h-big {
						font-size: 30px;
					}
				}
			}
		}
	}
	@media (max-width: 768px) {
		.login-page {
			display: block;
			overflow: auto;

			.side-box {
				display: block;
			}
		}
	}
</style>
