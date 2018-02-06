import sinon from 'sinon'
import mongoose from 'mongoose'
import TodoModel from '../src/models/todo';
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
    var expectedResult = {status: false, error: "Something went wrong"};
    TodoMock.expects('find').yields(expectedResult, null);
    Todo.find(function (err, result) {
        TodoMock.verify();
        TodoMock.restore();
        expect(err.status).to.not.be.true;
        done();
    });
  });
});
