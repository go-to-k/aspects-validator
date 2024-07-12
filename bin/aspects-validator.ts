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

// appから呼ぶ場合、各スタック定義の後(最後に)呼ぶ必要がある
app.node.addValidation(new Validator(app));
