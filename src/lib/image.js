
import isEmpty from 'is-empty'

export const imageArrayToString = (arr, prefix) => {
  return arr.map(img => img.key.replace(prefix, '')).join(':')
}

export const imageStringToArray = (string, prefix) => {
  if ( isEmpty(string) ) { return string }
  return string.split(':').map( name => prefix + name )
}
