import { Annotations } from 'aws-cdk-lib';
import { CfnBucket } from 'aws-cdk-lib/aws-s3';
import { IConstruct, IValidation } from 'constructs';

export class Validator implements IValidation {
  constructor(private readonly root: IConstruct) {
    this.root = root;
  }

  public validate(): string[] {
    return this.checkXxx(this.root);
  }

  private checkXxx(root: IConstruct): string[] {
    const errors: string[] = [];

    // 何か処理
    if (root instanceof CfnBucket) {
      Annotations.of(root).addWarningV2('my-library:Construct.validator-print', root.cfnResourceType);
      // 何か条件
      if (false) {
        errors.push(`エラー: ${root.node.id}`);
      }
    }

    root.node.children.forEach((child) => {
      errors.push(...this.checkXxx(child));
    });

    return errors;
  }
}
