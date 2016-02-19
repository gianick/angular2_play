'use strict';var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var validators_1 = require('../validators');
var default_value_accessor_1 = require('./default_value_accessor');
var number_value_accessor_1 = require('./number_value_accessor');
var checkbox_value_accessor_1 = require('./checkbox_value_accessor');
var select_control_value_accessor_1 = require('./select_control_value_accessor');
var normalize_validator_1 = require('./normalize_validator');
function controlPath(name, parent) {
    var p = collection_1.ListWrapper.clone(parent.path);
    p.push(name);
    return p;
}
exports.controlPath = controlPath;
function setUpControl(control, dir) {
    if (lang_1.isBlank(control))
        _throwError(dir, "Cannot find control");
    if (lang_1.isBlank(dir.valueAccessor))
        _throwError(dir, "No value accessor for");
    control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
    dir.valueAccessor.writeValue(control.value);
    // view -> model
    dir.valueAccessor.registerOnChange(function (newValue) {
        dir.viewToModelUpdate(newValue);
        control.updateValue(newValue, { emitModelToViewChange: false });
        control.markAsDirty();
    });
    // model -> view
    control.registerOnChange(function (newValue) { return dir.valueAccessor.writeValue(newValue); });
    // touched
    dir.valueAccessor.registerOnTouched(function () { return control.markAsTouched(); });
}
exports.setUpControl = setUpControl;
function setUpControlGroup(control, dir) {
    if (lang_1.isBlank(control))
        _throwError(dir, "Cannot find control");
    control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
}
exports.setUpControlGroup = setUpControlGroup;
function _throwError(dir, message) {
    var path = dir.path.join(" -> ");
    throw new exceptions_1.BaseException(message + " '" + path + "'");
}
function composeValidators(validators) {
    return lang_1.isPresent(validators) ? validators_1.Validators.compose(validators.map(normalize_validator_1.normalizeValidator)) : null;
}
exports.composeValidators = composeValidators;
function composeAsyncValidators(validators) {
    return lang_1.isPresent(validators) ? validators_1.Validators.composeAsync(validators.map(normalize_validator_1.normalizeValidator)) : null;
}
exports.composeAsyncValidators = composeAsyncValidators;
function isPropertyUpdated(changes, viewModel) {
    if (!collection_1.StringMapWrapper.contains(changes, "model"))
        return false;
    var change = changes["model"];
    if (change.isFirstChange())
        return true;
    return !lang_1.looseIdentical(viewModel, change.currentValue);
}
exports.isPropertyUpdated = isPropertyUpdated;
// TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
function selectValueAccessor(dir, valueAccessors) {
    if (lang_1.isBlank(valueAccessors))
        return null;
    var defaultAccessor;
    var builtinAccessor;
    var customAccessor;
    valueAccessors.forEach(function (v) {
        if (v instanceof default_value_accessor_1.DefaultValueAccessor) {
            defaultAccessor = v;
        }
        else if (v instanceof checkbox_value_accessor_1.CheckboxControlValueAccessor || v instanceof number_value_accessor_1.NumberValueAccessor ||
            v instanceof select_control_value_accessor_1.SelectControlValueAccessor) {
            if (lang_1.isPresent(builtinAccessor))
                _throwError(dir, "More than one built-in value accessor matches");
            builtinAccessor = v;
        }
        else {
            if (lang_1.isPresent(customAccessor))
                _throwError(dir, "More than one custom value accessor matches");
            customAccessor = v;
        }
    });
    if (lang_1.isPresent(customAccessor))
        return customAccessor;
    if (lang_1.isPresent(builtinAccessor))
        return builtinAccessor;
    if (lang_1.isPresent(defaultAccessor))
        return defaultAccessor;
    _throwError(dir, "No valid value accessor for");
    return null;
}
exports.selectValueAccessor = selectValueAccessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvbW1vbi9mb3Jtcy9kaXJlY3RpdmVzL3NoYXJlZC50cyJdLCJuYW1lcyI6WyJjb250cm9sUGF0aCIsInNldFVwQ29udHJvbCIsInNldFVwQ29udHJvbEdyb3VwIiwiX3Rocm93RXJyb3IiLCJjb21wb3NlVmFsaWRhdG9ycyIsImNvbXBvc2VBc3luY1ZhbGlkYXRvcnMiLCJpc1Byb3BlcnR5VXBkYXRlZCIsInNlbGVjdFZhbHVlQWNjZXNzb3IiXSwibWFwcGluZ3MiOiJBQUFBLDJCQUE0QyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzdFLHFCQUFpRCwwQkFBMEIsQ0FBQyxDQUFBO0FBQzVFLDJCQUE4QyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBTy9FLDJCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUV6Qyx1Q0FBbUMsMEJBQTBCLENBQUMsQ0FBQTtBQUM5RCxzQ0FBa0MseUJBQXlCLENBQUMsQ0FBQTtBQUM1RCx3Q0FBMkMsMkJBQTJCLENBQUMsQ0FBQTtBQUN2RSw4Q0FBeUMsaUNBQWlDLENBQUMsQ0FBQTtBQUMzRSxvQ0FBaUMsdUJBQXVCLENBQUMsQ0FBQTtBQUd6RCxxQkFBNEIsSUFBWSxFQUFFLE1BQXdCO0lBQ2hFQSxJQUFJQSxDQUFDQSxHQUFHQSx3QkFBV0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDdkNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO0lBQ2JBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO0FBQ1hBLENBQUNBO0FBSmUsbUJBQVcsY0FJMUIsQ0FBQTtBQUVELHNCQUE2QixPQUFnQixFQUFFLEdBQWM7SUFDM0RDLEVBQUVBLENBQUNBLENBQUNBLGNBQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO1FBQUNBLFdBQVdBLENBQUNBLEdBQUdBLEVBQUVBLHFCQUFxQkEsQ0FBQ0EsQ0FB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QUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtMaXN0V3JhcHBlciwgU3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7aXNCbGFuaywgaXNQcmVzZW50LCBsb29zZUlkZW50aWNhbH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcblxuaW1wb3J0IHtDb250cm9sQ29udGFpbmVyfSBmcm9tICcuL2NvbnRyb2xfY29udGFpbmVyJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICcuL25nX2NvbnRyb2wnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmV9IGZyb20gJy4vYWJzdHJhY3RfY29udHJvbF9kaXJlY3RpdmUnO1xuaW1wb3J0IHtOZ0NvbnRyb2xHcm91cH0gZnJvbSAnLi9uZ19jb250cm9sX2dyb3VwJztcbmltcG9ydCB7Q29udHJvbCwgQ29udHJvbEdyb3VwfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQge1ZhbGlkYXRvcnN9IGZyb20gJy4uL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7RGVmYXVsdFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGVmYXVsdF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge051bWJlclZhbHVlQWNjZXNzb3J9IGZyb20gJy4vbnVtYmVyX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7Q2hlY2tib3hDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9jaGVja2JveF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge1NlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL3NlbGVjdF9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7bm9ybWFsaXplVmFsaWRhdG9yfSBmcm9tICcuL25vcm1hbGl6ZV92YWxpZGF0b3InO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjb250cm9sUGF0aChuYW1lOiBzdHJpbmcsIHBhcmVudDogQ29udHJvbENvbnRhaW5lcik6IHN0cmluZ1tdIHtcbiAgdmFyIHAgPSBMaXN0V3JhcHBlci5jbG9uZShwYXJlbnQucGF0aCk7XG4gIHAucHVzaChuYW1lKTtcbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRVcENvbnRyb2woY29udHJvbDogQ29udHJvbCwgZGlyOiBOZ0NvbnRyb2wpOiB2b2lkIHtcbiAgaWYgKGlzQmxhbmsoY29udHJvbCkpIF90aHJvd0Vycm9yKGRpciwgXCJDYW5ub3QgZmluZCBjb250cm9sXCIpO1xuICBpZiAoaXNCbGFuayhkaXIudmFsdWVBY2Nlc3NvcikpIF90aHJvd0Vycm9yKGRpciwgXCJObyB2YWx1ZSBhY2Nlc3NvciBmb3JcIik7XG5cbiAgY29udHJvbC52YWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2UoW2NvbnRyb2wudmFsaWRhdG9yLCBkaXIudmFsaWRhdG9yXSk7XG4gIGNvbnRyb2wuYXN5bmNWYWxpZGF0b3IgPSBWYWxpZGF0b3JzLmNvbXBvc2VBc3luYyhbY29udHJvbC5hc3luY1ZhbGlkYXRvciwgZGlyLmFzeW5jVmFsaWRhdG9yXSk7XG4gIGRpci52YWx1ZUFjY2Vzc29yLndyaXRlVmFsdWUoY29udHJvbC52YWx1ZSk7XG5cbiAgLy8gdmlldyAtPiBtb2RlbFxuICBkaXIudmFsdWVBY2Nlc3Nvci5yZWdpc3Rlck9uQ2hhbmdlKG5ld1ZhbHVlID0+IHtcbiAgICBkaXIudmlld1RvTW9kZWxVcGRhdGUobmV3VmFsdWUpO1xuICAgIGNvbnRyb2wudXBkYXRlVmFsdWUobmV3VmFsdWUsIHtlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlfSk7XG4gICAgY29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICB9KTtcblxuICAvLyBtb2RlbCAtPiB2aWV3XG4gIGNvbnRyb2wucmVnaXN0ZXJPbkNoYW5nZShuZXdWYWx1ZSA9PiBkaXIudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKG5ld1ZhbHVlKSk7XG5cbiAgLy8gdG91Y2hlZFxuICBkaXIudmFsdWVBY2Nlc3Nvci5yZWdpc3Rlck9uVG91Y2hlZCgoKSA9PiBjb250cm9sLm1hcmtBc1RvdWNoZWQoKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRVcENvbnRyb2xHcm91cChjb250cm9sOiBDb250cm9sR3JvdXAsIGRpcjogTmdDb250cm9sR3JvdXApIHtcbiAgaWYgKGlzQmxhbmsoY29udHJvbCkpIF90aHJvd0Vycm9yKGRpciwgXCJDYW5ub3QgZmluZCBjb250cm9sXCIpO1xuICBjb250cm9sLnZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZShbY29udHJvbC52YWxpZGF0b3IsIGRpci52YWxpZGF0b3JdKTtcbiAgY29udHJvbC5hc3luY1ZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZUFzeW5jKFtjb250cm9sLmFzeW5jVmFsaWRhdG9yLCBkaXIuYXN5bmNWYWxpZGF0b3JdKTtcbn1cblxuZnVuY3Rpb24gX3Rocm93RXJyb3IoZGlyOiBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICB2YXIgcGF0aCA9IGRpci5wYXRoLmpvaW4oXCIgLT4gXCIpO1xuICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgJHttZXNzYWdlfSAnJHtwYXRofSdgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBvc2VWYWxpZGF0b3JzKHZhbGlkYXRvcnM6IC8qIEFycmF5PFZhbGlkYXRvcnxGdW5jdGlvbj4gKi8gYW55W10pOiBGdW5jdGlvbiB7XG4gIHJldHVybiBpc1ByZXNlbnQodmFsaWRhdG9ycykgPyBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRhdG9ycy5tYXAobm9ybWFsaXplVmFsaWRhdG9yKSkgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZUFzeW5jVmFsaWRhdG9ycyhcbiAgICB2YWxpZGF0b3JzOiAvKiBBcnJheTxWYWxpZGF0b3J8RnVuY3Rpb24+ICovIGFueVtdKTogRnVuY3Rpb24ge1xuICByZXR1cm4gaXNQcmVzZW50KHZhbGlkYXRvcnMpID8gVmFsaWRhdG9ycy5jb21wb3NlQXN5bmModmFsaWRhdG9ycy5tYXAobm9ybWFsaXplVmFsaWRhdG9yKSkgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9wZXJ0eVVwZGF0ZWQoY2hhbmdlczoge1trZXk6IHN0cmluZ106IGFueX0sIHZpZXdNb2RlbDogYW55KTogYm9vbGVhbiB7XG4gIGlmICghU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyhjaGFuZ2VzLCBcIm1vZGVsXCIpKSByZXR1cm4gZmFsc2U7XG4gIHZhciBjaGFuZ2UgPSBjaGFuZ2VzW1wibW9kZWxcIl07XG5cbiAgaWYgKGNoYW5nZS5pc0ZpcnN0Q2hhbmdlKCkpIHJldHVybiB0cnVlO1xuICByZXR1cm4gIWxvb3NlSWRlbnRpY2FsKHZpZXdNb2RlbCwgY2hhbmdlLmN1cnJlbnRWYWx1ZSk7XG59XG5cbi8vIFRPRE86IHZzYXZraW4gcmVtb3ZlIGl0IG9uY2UgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMzAxMSBpcyBpbXBsZW1lbnRlZFxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdFZhbHVlQWNjZXNzb3IoZGlyOiBOZ0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZUFjY2Vzc29yczogQ29udHJvbFZhbHVlQWNjZXNzb3JbXSk6IENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgaWYgKGlzQmxhbmsodmFsdWVBY2Nlc3NvcnMpKSByZXR1cm4gbnVsbDtcblxuICB2YXIgZGVmYXVsdEFjY2Vzc29yO1xuICB2YXIgYnVpbHRpbkFjY2Vzc29yO1xuICB2YXIgY3VzdG9tQWNjZXNzb3I7XG5cbiAgdmFsdWVBY2Nlc3NvcnMuZm9yRWFjaCh2ID0+IHtcbiAgICBpZiAodiBpbnN0YW5jZW9mIERlZmF1bHRWYWx1ZUFjY2Vzc29yKSB7XG4gICAgICBkZWZhdWx0QWNjZXNzb3IgPSB2O1xuXG4gICAgfSBlbHNlIGlmICh2IGluc3RhbmNlb2YgQ2hlY2tib3hDb250cm9sVmFsdWVBY2Nlc3NvciB8fCB2IGluc3RhbmNlb2YgTnVtYmVyVmFsdWVBY2Nlc3NvciB8fFxuICAgICAgICAgICAgICAgdiBpbnN0YW5jZW9mIFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yKSB7XG4gICAgICBpZiAoaXNQcmVzZW50KGJ1aWx0aW5BY2Nlc3NvcikpXG4gICAgICAgIF90aHJvd0Vycm9yKGRpciwgXCJNb3JlIHRoYW4gb25lIGJ1aWx0LWluIHZhbHVlIGFjY2Vzc29yIG1hdGNoZXNcIik7XG4gICAgICBidWlsdGluQWNjZXNzb3IgPSB2O1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc1ByZXNlbnQoY3VzdG9tQWNjZXNzb3IpKVxuICAgICAgICBfdGhyb3dFcnJvcihkaXIsIFwiTW9yZSB0aGFuIG9uZSBjdXN0b20gdmFsdWUgYWNjZXNzb3IgbWF0Y2hlc1wiKTtcbiAgICAgIGN1c3RvbUFjY2Vzc29yID0gdjtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChpc1ByZXNlbnQoY3VzdG9tQWNjZXNzb3IpKSByZXR1cm4gY3VzdG9tQWNjZXNzb3I7XG4gIGlmIChpc1ByZXNlbnQoYnVpbHRpbkFjY2Vzc29yKSkgcmV0dXJuIGJ1aWx0aW5BY2Nlc3NvcjtcbiAgaWYgKGlzUHJlc2VudChkZWZhdWx0QWNjZXNzb3IpKSByZXR1cm4gZGVmYXVsdEFjY2Vzc29yO1xuXG4gIF90aHJvd0Vycm9yKGRpciwgXCJObyB2YWxpZCB2YWx1ZSBhY2Nlc3NvciBmb3JcIik7XG4gIHJldHVybiBudWxsO1xufVxuIl19