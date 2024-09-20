import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'flutter_flow/flutter_flow_util.dart';

class FFAppState extends ChangeNotifier {
  static FFAppState _instance = FFAppState._internal();

  factory FFAppState() {
    return _instance;
  }

  FFAppState._internal();

  static void reset() {
    _instance = FFAppState._internal();
  }

  Future initializePersistedState() async {}

  void update(VoidCallback callback) {
    callback();
    notifyListeners();
  }

  String _MessageFromWeb = '';
  String get MessageFromWeb => _MessageFromWeb;
  set MessageFromWeb(String value) {
    _MessageFromWeb = value;
  }

  String _MessageToWeb = 'default';
  String get MessageToWeb => _MessageToWeb;
  set MessageToWeb(String value) {
    _MessageToWeb = value;
  }

  String _testResult = '';
  String get testResult => _testResult;
  set testResult(String value) {
    _testResult = value;
  }
}
