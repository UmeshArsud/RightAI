package com.project.calculator.service;

import com.project.calculator.exception.InvalidExpressionException;
import com.project.calculator.util.ValidationUtils;
import java.util.Stack;

public class CalculatorEngine {

    public double evaluate(String expression) throws InvalidExpressionException {
        char[] tokens = expression.replaceAll("\\s+", "").toCharArray();
        Stack<Double> values = new Stack<>();
        Stack<Character> ops = new Stack<>();

        for (int i = 0; i < tokens.length; i++) {
            if (Character.isDigit(tokens[i])) {
                StringBuilder sbuf = new StringBuilder();
                while (i < tokens.length && (Character.isDigit(tokens[i]) || tokens[i] == '.')) {
                    sbuf.append(tokens[i++]);
                }
                values.push(Double.parseDouble(sbuf.toString()));
                i--;
            } else if (tokens[i] == '(') {
                ops.push(tokens[i]);
            } else if (tokens[i] == ')') {
                while (!ops.isEmpty() && ops.peek() != '(') {
                    processOperation(ops, values);
                }
                if (!ops.isEmpty()) ops.pop();
            } else if (ValidationUtils.isOperator(tokens[i])) {
                while (!ops.isEmpty() && ValidationUtils.getPrecedence(tokens[i]) <= ValidationUtils.getPrecedence(ops.peek())) {
                    processOperation(ops, values);
                }
                ops.push(tokens[i]);
            } else {
                throw new InvalidExpressionException("Unknown character: " + tokens[i]);
            }
        }
        while (!ops.isEmpty()) {
            processOperation(ops, values);
        }
        if (values.isEmpty()) return 0;
        return values.pop();
    }

    private void processOperation(Stack<Character> ops, Stack<Double> values) throws InvalidExpressionException {
        if (values.size() < 2) throw new InvalidExpressionException("Invalid format");
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));
    }

    private double applyOp(char op, double b, double a) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': if (b == 0) throw new ArithmeticException("Cannot divide by zero"); return a / b;
        }
        return 0;
    }
}