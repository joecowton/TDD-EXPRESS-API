import sinon from 'sinon'
import chai, { expect } from 'chai'
import mongoose from 'mongoose'
import Todo from '../src/models/todo';
import 'sinon-mongoose';

describe('Get all todos', () => {
  beforeEach(() =>{
  })

  it('should return all todos', (done) => {
    let TodoMock = sinon.mock(Todo);
    let expectedResult = { status: true, todo: []};

    TodoMock.expects('find').yields(null, expectedResult);

    Todo.find((err, result) => {
      TodoMock.verify();
      TodoMock.restore();
      expect(result.status).to.be.true;
      done();
    })
  })

  it("should return error", function(done){
    let TodoMock = sinon.mock(Todo);

    let expectedResult = {status: false, error: "Something went wrong"};

    TodoMock.expects('find').yields(expectedResult, null);

    Todo.find(function (err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
    });
  });
});
describe("Post a new todo", function(){
    it("should create new post", function(done){
        var TodoMock = sinon.mock(new Todo({ todo: 'Save new todo from mock'}));
        var todo = TodoMock.object;
        var expectedResult = { status: true };
        TodoMock.expects('save').yields(null, expectedResult);
        todo.save(function (err, result) {
            TodoMock.verify();
            TodoMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the todo is not saved
    it("should return error, if post not saved", function(done){
        var TodoMock = sinon.mock(new Todo({ todo: 'Save new todo from mock'}));
        var todo = TodoMock.object;
        var expectedResult = { status: false };
        TodoMock.expects('save').yields(expectedResult, null);
        todo.save(function (err, result) {
            TodoMock.verify();
            TodoMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});
