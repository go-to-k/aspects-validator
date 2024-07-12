#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyStack } from '../lib/stack';
import { Validator } from '../lib/validator';
import { MyAspect } from '../lib/aspect';

const app = new cdk.App();

const stack1 = new MyStack(app, 'Stack1', {});
cdk.Aspects.of(stack1).add(new MyAspect());

const stack2 = new MyStack(app, 'Stack2', {});
// 呼び忘れ
// cdk.Aspects.of(stack2).add(new MyAspect());

// スタック定義の後(最後に)呼ぶ必要がある
// -> これを忘れることを考えると、staticメソッドじゃなくて普通にstackごとにnode.addValidation呼んだ方がいいかも？
// App, StageはaddValidationが効かないので、それらから直接呼んではいけない
// -> NG: app.node.addValidation(new Validator(app));
Validator.attachTo(app);
