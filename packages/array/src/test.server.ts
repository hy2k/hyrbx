import { Reporters, TestBootstrap } from '@rbxts/testez';

const ServerStorage = game.GetService('ServerStorage');

TestBootstrap.run([ServerStorage], Reporters.TextReporter);
