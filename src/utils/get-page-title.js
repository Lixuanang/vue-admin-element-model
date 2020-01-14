import defaultSettings from '@/settings'
import i18n from '@/lang'

const title = defaultSettings.title || '鸿达'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${i18n.t('route.' + pageTitle)} - ${title}`
  }
  return `${title}`
}
