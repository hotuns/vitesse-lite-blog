import type { RouteRecordNormalized } from 'vue-router'

export interface frontmatter {
  title: string
  date: string
  lang: string
  type: string
}

export declare interface MyRouteRecordNormalized extends RouteRecordNormalized {
  meta: {
    frontmatter: frontmatter
  }
}
