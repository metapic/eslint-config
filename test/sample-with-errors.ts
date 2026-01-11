// Test file with intentional style violations
const testVariable = "hello" // Double quotes instead of single

function testFunction(arg:string):string{return arg} // No spacing, missing semicolon

// Import order violation
import { z } from 'external';
import { a } from 'another';
import fs from 'fs';

const unusedVar = 'test'; // Unused variable

export {testFunction,testVariable} // Missing spaces
