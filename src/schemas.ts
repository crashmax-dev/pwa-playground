import { z } from 'zod'

const imageSchema = z.object({
  src: z.string(),
  sizes: z.string(),
  type: z.string()
})

const trackerSettingsSchema = z.object({
  geo_blacklist: z.array(z.string()),
  offer_url: z.string(),
  white_url: z.string()
})

const verticalSchema = z.object({
  collage_template: z.object({
    icon_image: imageSchema,
    horizontal_slider_images: z.array(imageSchema)
  })
})

const contentCommentSchema = z.object({
  image: z.string(),
  author_name: z.string(),
  rating: z.number(),
  likes_count: z.number(),
  date_time: z.number(),
  content: z.string(),
  review: z
    .object({
      author_name: z.string(),
      date_time: z.number(),
      content: z.string()
    })
    .or(z.null())
})

const contentSchema = z.object({
  application_name: z.string(),
  application_developer_name: z.string(),
  category: z.string(),
  description: z.string(),
  language_code: z.string(),
  reviews: z.number(),
  review_count: z.number(),
  percent_per_rating: z.record(z.number()),
  rating: z.number(),
  comments: z.array(contentCommentSchema)
})

export const applicationSchema = z.object({
  tracker_settings: trackerSettingsSchema,
  vertical: verticalSchema,
  content: z.array(contentSchema)
})

export const manifestSchema = z.object({
  name: z.string(),
  short_name: z.string(),
  lang: z.string(),
  dir: z.string(),
  display: z.string(),
  start_url: z.string(),
  scope: z.string(),
  icons: z.array(imageSchema),
  screenshots: z.array(imageSchema)
})

export type Application = z.infer<typeof applicationSchema>
export type ApplicationContent = z.infer<typeof contentSchema>
export type Manifest = z.infer<typeof manifestSchema>
