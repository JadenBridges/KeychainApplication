/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { StaticSymbol } from '../aot/static_symbol';
import * as o from '../output/output_ast';
/**
 * Convert an object map with `Expression` values into a `LiteralMapExpr`.
 */
export function mapToMapExpression(map) {
    var result = Object.keys(map).map(function (key) { return ({ key: key, value: map[key], quoted: false }); });
    return o.literalMap(result);
}
/**
 * Convert metadata into an `Expression` in the given `OutputContext`.
 *
 * This operation will handle arrays, references to symbols, or literal `null` or `undefined`.
 */
export function convertMetaToOutput(meta, ctx) {
    if (Array.isArray(meta)) {
        return o.literalArr(meta.map(function (entry) { return convertMetaToOutput(entry, ctx); }));
    }
    if (meta instanceof StaticSymbol) {
        return ctx.importExpr(meta);
    }
    if (meta == null) {
        return o.literal(meta);
    }
    throw new Error("Internal error: Unsupported or unknown metadata: " + meta);
}
export function typeWithParameters(type, numParams) {
    var params = null;
    if (numParams > 0) {
        params = [];
        for (var i = 0; i < numParams; i++) {
            params.push(o.DYNAMIC_TYPE);
        }
    }
    return o.expressionType(type, null, params);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9yZW5kZXIzL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sS0FBSyxDQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHMUM7O0dBRUc7QUFDSCxNQUFNLDZCQUE2QixHQUFrQztJQUNuRSxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLENBQUMsRUFBQyxHQUFHLEtBQUEsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUF2QyxDQUF1QyxDQUFDLENBQUM7SUFDcEYsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSw4QkFBOEIsSUFBUyxFQUFFLEdBQWtCO0lBQy9ELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QixPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLG1CQUFtQixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDLENBQUM7S0FDekU7SUFDRCxJQUFJLElBQUksWUFBWSxZQUFZLEVBQUU7UUFDaEMsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzdCO0lBQ0QsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4QjtJQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQW9ELElBQU0sQ0FBQyxDQUFDO0FBQzlFLENBQUM7QUFFRCxNQUFNLDZCQUE2QixJQUFrQixFQUFFLFNBQWlCO0lBQ3RFLElBQUksTUFBTSxHQUFrQixJQUFJLENBQUM7SUFDakMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO1FBQ2pCLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzdCO0tBQ0Y7SUFDRCxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM5QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1N0YXRpY1N5bWJvbH0gZnJvbSAnLi4vYW90L3N0YXRpY19zeW1ib2wnO1xuaW1wb3J0ICogYXMgbyBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge091dHB1dENvbnRleHR9IGZyb20gJy4uL3V0aWwnO1xuXG4vKipcbiAqIENvbnZlcnQgYW4gb2JqZWN0IG1hcCB3aXRoIGBFeHByZXNzaW9uYCB2YWx1ZXMgaW50byBhIGBMaXRlcmFsTWFwRXhwcmAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXBUb01hcEV4cHJlc3Npb24obWFwOiB7W2tleTogc3RyaW5nXTogby5FeHByZXNzaW9ufSk6IG8uTGl0ZXJhbE1hcEV4cHIge1xuICBjb25zdCByZXN1bHQgPSBPYmplY3Qua2V5cyhtYXApLm1hcChrZXkgPT4gKHtrZXksIHZhbHVlOiBtYXBba2V5XSwgcXVvdGVkOiBmYWxzZX0pKTtcbiAgcmV0dXJuIG8ubGl0ZXJhbE1hcChyZXN1bHQpO1xufVxuXG4vKipcbiAqIENvbnZlcnQgbWV0YWRhdGEgaW50byBhbiBgRXhwcmVzc2lvbmAgaW4gdGhlIGdpdmVuIGBPdXRwdXRDb250ZXh0YC5cbiAqXG4gKiBUaGlzIG9wZXJhdGlvbiB3aWxsIGhhbmRsZSBhcnJheXMsIHJlZmVyZW5jZXMgdG8gc3ltYm9scywgb3IgbGl0ZXJhbCBgbnVsbGAgb3IgYHVuZGVmaW5lZGAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0TWV0YVRvT3V0cHV0KG1ldGE6IGFueSwgY3R4OiBPdXRwdXRDb250ZXh0KTogby5FeHByZXNzaW9uIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkobWV0YSkpIHtcbiAgICByZXR1cm4gby5saXRlcmFsQXJyKG1ldGEubWFwKGVudHJ5ID0+IGNvbnZlcnRNZXRhVG9PdXRwdXQoZW50cnksIGN0eCkpKTtcbiAgfVxuICBpZiAobWV0YSBpbnN0YW5jZW9mIFN0YXRpY1N5bWJvbCkge1xuICAgIHJldHVybiBjdHguaW1wb3J0RXhwcihtZXRhKTtcbiAgfVxuICBpZiAobWV0YSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG8ubGl0ZXJhbChtZXRhKTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgSW50ZXJuYWwgZXJyb3I6IFVuc3VwcG9ydGVkIG9yIHVua25vd24gbWV0YWRhdGE6ICR7bWV0YX1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHR5cGVXaXRoUGFyYW1ldGVycyh0eXBlOiBvLkV4cHJlc3Npb24sIG51bVBhcmFtczogbnVtYmVyKTogby5FeHByZXNzaW9uVHlwZSB7XG4gIGxldCBwYXJhbXM6IG8uVHlwZVtdfG51bGwgPSBudWxsO1xuICBpZiAobnVtUGFyYW1zID4gMCkge1xuICAgIHBhcmFtcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUGFyYW1zOyBpKyspIHtcbiAgICAgIHBhcmFtcy5wdXNoKG8uRFlOQU1JQ19UWVBFKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG8uZXhwcmVzc2lvblR5cGUodHlwZSwgbnVsbCwgcGFyYW1zKTtcbn1cbiJdfQ==