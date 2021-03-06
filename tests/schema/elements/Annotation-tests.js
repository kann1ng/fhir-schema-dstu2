var fhir = require('../../../lib');

var expect = require('chai').expect;

describe('elements.Annotation', function () {

    var schema = fhir.schema.Annotation;

    var data;

    beforeEach(function(){
        data =  {
            authorReference: {
                display: 'Dr Doolittle'
            },
            time: '2015-09-14T17:04:00',
            text: 'The quick brown fox etc'
        };
    });

    it('validates an Annotation', function () {
        var result = fhir.validator.validate(data, schema);

        if (!result.valid) {
            console.log(result);
        }

        expect(result.valid).to.be.true;
    });

    it('validates an Annotation without author', function () {
        delete data.authorReference;

        var result = fhir.validator.validate(data, schema);

        if (!result.valid) {
            console.log(result);
        }

        expect(result.valid).to.be.true;
    });

    it('rejects an Annotation with more than one author[x]', function () {
        data.authorString = 'Dr Doolittle';

        var result = fhir.validator.validate(data, schema);

        expect(result.valid).to.be.false;
    });

    it('rejects an Annotation without text', function () {
        delete data.text;

        var result = fhir.validator.validate(data, schema);

        expect(result.valid).to.be.false;
    });
});