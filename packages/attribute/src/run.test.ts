import { Reporters, TestBootstrap } from '@rbxts/testez';

TestBootstrap.run([script.Parent ?? error('Invalid setup')], Reporters.TextReporter);
