// Automatic FlutterFlow imports
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'index.dart'; // Imports other custom actions
import 'package:flutter/material.dart';
// Begin custom action code
// DO NOT REMOVE OR MODIFY THE CODE ABOVE!

import "dart:html" as html;

Future sendMessageToWeb() async {
  html.window.parent!.postMessage(FFAppState().MessageToWeb, '*');
}
