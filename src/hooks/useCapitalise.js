import React from 'react'

const useCapitalise = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default useCapitalise