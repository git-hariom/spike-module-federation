// Automatic FlutterFlow imports
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'index.dart'; // Imports other custom actions
import 'package:flutter/material.dart';
// Begin custom action code
// DO NOT REMOVE OR MODIFY THE CODE ABOVE!

import 'dart:convert';

Future codePlayGround() async {
  Map<String, dynamic> person = {'name': 'Hariom', 'age': 30};
  String jsonString = jsonEncode(person);
  print('string result $jsonString');
  FFAppState().testResult = jsonString;
}
