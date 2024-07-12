import { Annotations } from 'aws-cdk-lib';
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

    // 何か処理(テキトーに出力)
    Annotations.of(root).addWarningV2('my-library:Construct.validator-print', root.node.id);

    root.node.children.forEach((child) => {
      errors.push(...this.checkXxx(child));
    });

    return errors;
  }
}
