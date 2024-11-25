declare module 'decision-tree' {
  interface TreeNode {
    type: string
    val?: string
    name: string
    alias: string
    gain?: number
    sampleSize?: number
    prob?: number
    vals?: TreeNode[]
    child?: TreeNode
  }

  interface DecisionTreeID3Json {
    model: TreeNode
    data: Record<string, any>[]
    target: string
    features: string[]
  }

  export default class DecisionTreeID3 {
    target: string
    features: string[]
    model: TreeNode

    static NODE_TYPES: {
      RESULT: string
      FEATURE: string
      FEATURE_VALUE: string
    }

    constructor(
      targetOrData: string | Record<string, any>[],
      targetOrFeatures?: string | string[],
      features?: string[]
    )

    train(data: Record<string, any>[]): void

    predict(sample: Record<string, any>): string

    evaluate(samples: Record<string, any>[]): number

    import(json: DecisionTreeID3Json): void

    toJSON(): DecisionTreeID3Json
  }
}
