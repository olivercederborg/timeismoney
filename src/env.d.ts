/// <reference types="vite/client" />

declare module '*.vue' {
	import { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_FB_APIKEY: string
	readonly VITE_FB_AUTHDOMAIN: string
	readonly VITE_FB_PROJECTID: string
	readonly VITE_FB_STORAGEBUCKET: string
	readonly VITE_FB_MESSAGING_SENDERID: string
	readonly VITE_FB_APPID: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
