import { Annotations, Stage } from 'aws-cdk-lib';
import { IConstruct, IValidation } from 'constructs';

export class Validator implements IValidation {
  static attachTo(root: IConstruct) {
    if (Stage.isStage(root)) {
      // Stage(AppもStageを継承しているので同様)はaddValidationが効かないので、スタックまで取り出す
      root.node.children.forEach((child) => {
        Validator.attachTo(child);
      });
    } else {
      root.node.addValidation(new Validator(root));
    }
  }

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
