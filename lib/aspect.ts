import { Annotations, IAspect, Tokenization } from 'aws-cdk-lib';
import { CfnBucket } from 'aws-cdk-lib/aws-s3';
import { IConstruct } from 'constructs';

export class MyAspect implements IAspect {
  public visit(node: IConstruct): void {
    if (node instanceof CfnBucket) {
      if (
        !node.versioningConfiguration ||
        (!Tokenization.isResolvable(node.versioningConfiguration) && node.versioningConfiguration.status !== 'Enabled')
      ) {
        // 何か処理(テキトーに出力)
        Annotations.of(node).addWarningV2('my-library:Construct.aspect-print', node.node.id);
      }
    }
  }
}
