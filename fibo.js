function fibonacci(n) {
    var fib = [0, 1];
    for (var i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib.slice(0, n + 1);
}

var n=10000;
 var fibSequence = fibonacci(n);
 console.log("Fibonacci sucesion de ", n, "numeros", fibSequence)