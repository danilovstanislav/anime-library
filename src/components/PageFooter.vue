<template>
	<footer class="footer">
		<div class="footer__wrapper">
			<router-link class="footer__logo" :to="{ name: 'HomePage' }"
				>AnimeBase</router-link
			>
			<div class="footer__content">
				<ul class="footer__links-list">
					<li class="footer__item">
						<router-link class="footer__link" :to="{ name: 'HomePage' }">
							Terms of Service
						</router-link>
					</li>
					<li class="footer__item">
						<router-link class="footer__link" :to="{ name: 'HomePage' }">
							Copyright Policy
						</router-link>
					</li>
					<li class="footer__item">
						<router-link class="footer__link" :to="{ name: 'HomePage' }">
							Privacy Policy
						</router-link>
					</li>
					<li class="footer__item">
						<router-link class="footer__link" :to="{ name: 'HomePage' }">
							About
						</router-link>
					</li>
					<li class="footer__item">
						<router-link class="footer__link" :to="{ name: 'HomePage' }">
							Help/FAQ
						</router-link>
					</li>
				</ul>
				<div class="footer__copyright">
					AnimeBase is a property of AnimeBase Co.,Ltd. ©2022 All Rights
					Reserved.
				</div>
				<div class="footer__recaptcha">
					This site is protected by reCAPTCHA and the Google Privacy Policy and
					Terms of Service apply.
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
.footer
	width: 100%
	padding-top: 40px
	padding-bottom: 15px
	background-color: springgreen

	&__wrapper
		@include container
		display: flex
		align-items: center
		justify-content: center

	&__content
		flex-grow: 1

	&__logo
		margin-right: 10px
		display: block
		font-family: 'Akaya-Telivigala'
		font-size: 24px
		line-height: .9
		text-decoration: none
		color: #000

	&__links-list
		padding: 0
		margin-top: 0
		margin-bottom: 20px
		display: flex
		justify-content: center
		list-style-type: none

	&__item
		min-width: 100px
		padding: 8px 10px
		transition: .2s
		text-align: center

		&:hover
			text-decoration: underline

	&__link
		display: block
		color: #000
		text-decoration-line: none

	&__copyright
		font-size: 14px
		text-align: center

	&__recaptcha
		font-size: 12px
		text-align: center
</style>