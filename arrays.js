/*!
 * Kurry-Arrays
 *
 * Copyright 2013 Liam Goodacre
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function(define) {

  define(['Kurry'], function (Kurry) {

    if (!Kurry || !Kurry.autopoly) {
      throw new Error('Kurry-Arrays not initialized; could not find Kurry.js')
    }

    var Arrays = {}

    var autopoly = Kurry.autopoly
    var concat = Function.apply.bind([].concat, [])


    //: [a] -> [a] -> [a]
    Arrays.append = autopoly(function(xs, ys) {
      return concat([xs, ys])
    })

    //: (b -> a -> b) -> b -> [a] -> b
    Arrays.foldl = autopoly(function(f, u, xs) {
      return xs.reduce(function(acc, val) {
        return f(acc, val)
      }, u)
    })

    //: (b -> a -> b) -> b -> [a] -> b
    Arrays.foldr = autopoly(function(f, u, xs) {
      return xs.reduceRight(function(acc, val) {
        return f(acc, val)
      }, u)
    })

    //: Num -> Num -> [a]
    Arrays.slice = autopoly(function(s, e, xs) {
      return xs.slice(s, e)
    })

    //: Num -> Num -> [a]
    Arrays.drop = autopoly(function(n, xs) {
      return xs.slice(n)
    })

    //: Num -> [a]
    Arrays.take = Arrays.slice(0)

    //: Num -> [a]
    Arrays.tail = Arrays.drop(1)

    //: (a -> a -> a) -> [a] -> a
    Arrays.foldl1 = autopoly(function(f, xs) {
      return Arrays.foldl(f, xs[0], Arrays.tail(xs))
    })

    //: (a -> a -> a) -> [a] -> a
    Arrays.foldr1 = autopoly(function(f, xs) {
      return Arrays.foldr(f, xs[0], Arrays.tail(xs))
    })

    //: [[a]] -> [a]
    Arrays.concat = Arrays.foldl(Arrays.append, [])

    //: (a -> Num -> b) -> [a] -> [b]
    Arrays.mapIndexed = autopoly(function(f, xs) {
      return xs.map(function(v, i) {
        return f(v, i)
      })
    })

    //: (a -> b) -> [a] -> [b]
    Arrays.lift = autopoly(function(f, xs) {
      return xs.map(function(v) {
        return f(v)
      })
    })

    //: a -> [a]
    Arrays.unit = function(v) {
      return [v]
    }

    //: [a] -> (a -> [b]) -> [b]
    Arrays.bind = autopoly(function(ma, f) {
      return Arrays.concat(Arrays.lift(f, ma))
    })

    //: (a -> [b]) -> [a] -> [b]
    Arrays.bindOn = autopoly(function(f, ma) {
      return Arrays.bind(ma, f)
    })

    //: [? -> [?]] -> [?] -> [?]
    Arrays.foldlBind = autopoly(function(fs, xs) {
      return Arrays.foldl(Arrays.bind, xs, fs)
    })

    //: [? -> [?]] -> [?] -> [?]
    Arrays.foldrBind = autopoly(function(fs, xs) {
      return Arrays.foldr(Arrays.bind, xs, fs)
    })

    //: Num -> Num -> Num -> [Num]
    Arrays.stepRange = autopoly(function(interval, start, end) {
      var result = []

      if ((start !== -Infinity) && (end !== Infinity) && (interval > 0)) {
        for (; start < end; start += interval) {
          result.push(start)
        }
      }

      return result
    })

    //: Num -> Num -> [Num]
    Arrays.range = Arrays.stepRange(1)

    //: (a -> Bool) -> [a] -> Bool
    Arrays.some = autopoly(function(pred, xs) {
      var result = false
      for (var i = 0, l = xs.length; !result && i < l; i += 1) {
        result = pred(xs[i]) }
      return result
    })

    //: (a -> Bool) -> [a] -> Bool
    Arrays.all = autopoly(function(pred, xs) {
      var result = true
      for (var i = 0, l = xs.length; result && i < l; i += 1) {
        result = pred(xs[i]) }
      return result
    })

    return Arrays
  })

})(typeof define == 'function' ? define : typeof exports == 'object' ? function(ds, f) {
  module.exports = f.apply(this, ds.map(require));
} : function(ds, f) {
  var self = this;
  self[f.name] = f.apply(self, ds.map(function(d) {
    return self[d];
  }));
});