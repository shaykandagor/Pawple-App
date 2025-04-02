import React, {PropsWithChildren} from 'react'
import {StyleSheet} from 'react-native'
import {SWRConfig} from 'swr'
import {apiFetcher} from './apiFetcher'

const ApiConfigProvider = ({ children }: PropsWithChildren) => {
  return (
    <SWRConfig value={{ fetcher: async (resource, init) => await apiFetcher(resource, init) }}>
      {children}
    </SWRConfig>
  )
}

export default ApiConfigProvider

const styles = StyleSheet.create({})
