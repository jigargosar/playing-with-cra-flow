// @flow

import * as faker from 'faker'
import {head, times} from 'ramda'

export type TagId = string

export type Tag = {|
  id: TagId,
  title: string,
|}

export function createTag(): Tag {
  return {
    id: faker.random.alphaNumeric(4),
    title: head(faker.random.word().split(/[ -]/)),
  }
}

export function createTagList(count: number = 50): Tag[] {
  return times(createTag, count)
}

export type TagCollection = Tag[]
