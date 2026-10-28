export function usePageSeo(title: string, description: string, path = '/') {
  const siteUrl = useRuntimeConfig().public.siteUrl
  const url = siteUrl + path
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: url,
    ogLocale: 'id_ID',
    twitterCard: 'summary_large_image'
  })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
